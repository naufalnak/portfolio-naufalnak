# Three Bugs That Almost Shipped to Production: Technical Stories From BengkelHub

> 📸 **[IMAGE 1: Screenshot of code or terminal — or a diagram of the booking-to-Service conversion flow]**

In _Part 1_, I wrote about why BengkelHub came out of rebuilding a messy MSIB project, and why I chose Go, Fiber, and a multi-tenant architecture for the new version.

This part gets more technical. Three bugs that looked small at first, but if left unnoticed, could have led to much more serious problems: service history bleeding into the wrong person, everyone failing to register, and WhatsApp notifications silently failing with no one knowing why.

---

## Bug #1: Matching by License Plate Alone Is Dangerous

BengkelHub has two paths for customers to enter the system: online booking through the app, and walk-ins who show up directly at the workshop. Both have to end up as the same kind of data: one `Customer`, one `Vehicle`, one `Service`.

> 📸 **[IMAGE 2: Screenshot of the "Convert to Service" page, or a diagram of the booking → Customer/Vehicle/Service flow]**

When I built the "Convert to Service" feature (turning an online booking into an internal service record), the logic seemed simple: look up the vehicle by license plate within that workshop. If it exists, use it. If not, create a new one.

```go
vehicle, err := s.vehicleRepo.FindByPlateNumber(workshopID, plateNumber)
```

Seemed reasonable enough. A license plate is a unique vehicle identifier, right? The problem only surfaced during testing with dummy data: I created a new booking with a plate that _happened_ to match a vehicle already registered under a different customer in the seed data. The moment I clicked "Convert to Service," the system found that existing vehicle and immediately attached the new service to it.

The result: the newly created Service and Invoice ended up recorded under the **wrong customer**. Not the person who actually made the booking, but the previous owner of a vehicle with a matching plate.

This isn't just a display bug. It's a data leak between customers. If this happened for real (two different people happening to enter the same plate, whether from a typo or the vehicle actually changing hands), one person's service history could end up attached to a completely unrelated account.

The fix: vehicle matching is now scoped to **the combination of plate AND customer**, not the plate alone.

```go
vehicle, err := s.vehicleRepo.FindByCustomerAndPlate(workshopID, customer.ID, plateNumber)
```

The trade-off is that there can now be two vehicle records with the same plate under different customers, if they happen to collide. I chose this deliberately: better to have a small amount of duplicate data that can be merged manually later than have service history silently leak to an unrelated person.

---

## Bug #2: A Phone Number Validation Change That Nearly Locked Everyone Out of Signup

BengkelHub's philosophy is simple: customers fill in their own data through booking, operators just process it. For that to actually work, a customer's phone number has to be present, since it's used both for WhatsApp notifications and for converting a booking into a service.

> 📸 **[IMAGE 3: Screenshot of the registration form or a phone number validation error]**

I changed the backend validation from optional to required:

```go
Phone string `json:"phone" validate:"required,e164"`
```

`e164` is the international standard format for phone numbers, for example `+6281234567890`. Right after applying this validation, I went back and checked the registration form on the frontend, out of curiosity. Turns out the form only validated a minimum character length, with no transformation at all, and sent raw numbers like `081234567890` straight to the backend.

A number in `08xxx` format is **not** `e164` format (which requires a leading `+`). Meaning, if this validation had actually gone live without a frontend fix, **everyone registering with a normal Indonesian phone number format would get rejected by the backend**. This bug technically existed from the start (back when validation was still optional, it just wasn't visible since empty numbers passed too), and only surfaced clearly once I tightened the validation.

The fix touched both sides. Added a normalization function on the frontend before sending the data:

```typescript
export function toE164(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("62")) return "+" + digits;
  if (digits.startsWith("0")) return "+62" + digits.slice(1);
  return "+62" + digits;
}
```

And kept the backend validation strict, so that if anyone ever hits the API directly without going through the form, the incoming data stays consistent.

The lesson: validation that's technically "correct" on one side (backend) can silently break everything if the other side (frontend) doesn't get checked alongside it. I only caught this because I deliberately retested with realistic data, instead of just trusting that the form was "surely fine."

But the story doesn't end there. BengkelHub has two registration forms: one for workshop operators, one for customers. When I built this phone normalization fix, I applied it to both. Or so I thought.

Some time later, when I went back and checked the project directly (instead of just trusting the previous change notes), it turned out the fix had only actually landed on the customer registration form. The operator registration form was still on the old version: sending raw phone numbers with no normalization at all. The whole time, anyone trying to register as a workshop operator using a normal phone format would get rejected by the backend, while customers registering had no issue.

Same bug, same fix, but only stuck to half the places it was supposed to. A reminder that "I already fixed it" is a claim that needs re-verifying against the code that's actually running, not something to assume propagated everywhere it should have.

---

## Bug #3: Misreading the Fonnte Response, Which Made Errors Look Empty

WhatsApp notifications in BengkelHub run through Fonnte, and for scheduled booking reminders, I used Asynq (a Redis-backed job queue) so the process runs in the background, separate from the main request.

> 📸 **[IMAGE 4: Asynq worker diagram — enqueue task → Redis → separate worker → Fonnte API]**

Roughly how it works: the moment a new booking comes in, I enqueue a task to Asynq with a scheduled execution time (say, a day before the service appointment). The Asynq worker runs as a separate process, pulls the task from Redis once its time arrives, and only then calls Fonnte to send the WhatsApp message. If it fails, Asynq automatically retries based on its configuration, without me having to build retry logic myself.

What turned out interesting wasn't Asynq itself, but the Fonnte integration. When I built a feature to manually send invoices over WhatsApp (not a scheduled reminder, but a button the operator clicks), an error like this started showing up:

```
failed to send WA message: Fonnte error:
```

Notice there's no message after "Fonnte error:". Empty. I initially assumed this was a bug in my own code, but after checking again, it turned out my response struct was reading the `message` field from Fonnte's response:

```go
type sendResponse struct {
    Status  bool   `json:"status"`
    Message string `json:"message"`
}
```

Except Fonnte, on failure, returns a field called `reason`, not `message`. So the `Message` field in my struct was always empty, and the error looked like it had no information at all, when Fonnte had actually already told me why it failed.

The fix:

```go
type sendResponse struct {
    Status  bool   `json:"status"`
    Reason  string `json:"reason"`
    Message string `json:"message"` // kept in case other versions use this field
}
```

After the fix, the errors became clear, for example `request invalid on disconnected device`, which turned out to be a problem outside the code entirely: the WhatsApp device linked to my Fonnte account had disconnected and needed its QR code rescanned.

The lesson here is simple but easy to miss: if a third-party API integration looks like it's "failing for no reason," check whether you're actually reading the correct response field before rushing to suspect your own code.

---

## Closing Thoughts

Read one at a time, these three bugs look small. But each one carried consequences that weren't trivial if they'd shipped to production: customer data getting mixed up, an entire registration system silently broken (and only half-fixed when patched), and notifications failing to send with no one aware of why.

All of these came to light precisely because I made time to retest with realistic scenarios, and more importantly, to verify directly against the code that's actually running, instead of trusting a "already fixed" note from a previous work session. Talking things through with Claude Code to trace each root cause made the process much faster than debugging alone would have been, but the final verification stayed mine to own.

BengkelHub is still under active development. There's still a long roadmap ahead, including Android versions for both customers and operators. But at least now I'm more confident the foundation is solid enough to keep building on.

_(Part 1 is linked in the "Related Posts" section below.)_
