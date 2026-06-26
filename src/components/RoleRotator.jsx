import { useState, useEffect } from "react";

const ROLES = [
  "Back End Developer",
  "Fullstack Developer",
  "Web Developer",
  "Mobile Developer",
];

const TYPE_SPEED = 55;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 300;

export default function RoleRotator() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPE);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length - 1));
        }, DELETE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <span>
      {text}
      <span className="role-rotator-cursor">|</span>
    </span>
  );
}
