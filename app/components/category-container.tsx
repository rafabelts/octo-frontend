import { Link } from '@remix-run/react';
import React from 'react';

interface CategoryContainerProps {
  icon: string;
  label: string;
  color: string;
  path: string;
}

export function CategoryContainer(props: CategoryContainerProps) {
  return (
    <Link
      to={props.path}
      className="flex flex-col items-center justify-center rounded-lg w-full"
      style={{ backgroundColor: props.color, height: 150, width: 171 }}
    >
      <p className="text-4xl mb-4">{props.icon}</p> {/* Larger icon size */}
      <p className="text-title1 font-semibold" style={{ color: '#FFFF' }}>
        {props.label}
      </p>
    </Link>
  );
}
