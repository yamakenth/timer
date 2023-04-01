import React from "react";

interface CountdownPageProps {
  time: Number[];
}

export default function CountdownPage({ time }: CountdownPageProps) {
  return (
    <div>
      <div>{JSON.stringify(time)}</div>
      <button>X</button>
    </div>
  );
}
