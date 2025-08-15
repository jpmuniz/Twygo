import React from "react";

type Kind = "play" | "edit" | "delete" | "close";

type Props = {
  kind: Kind;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;          
  ariaLabel?: string;      
  size?: number;           
  iconSize?: number;       
  bg?: string;             
  color?: string;          
  style?: React.CSSProperties; 
  className?: string;
};

const ICONS: Record<Kind, React.ReactNode> = {
  play: (
    <path d="M8 5v14l11-7z" />
  ),
  edit: (
    <>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </>
  ),
  delete: (
    <>
      <path d="M6 7h12v2H6z" />
      <path d="M9 9h6l-1 11H10L9 9z" />
      <path d="M9 4h6v2H9z" />
    </>
  ),
  close: (
    <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
  ),
};

const VideoActionButton = ({
  kind,
  onClick,
  title,
  ariaLabel,
  size = 44,
  iconSize = 24,
  bg = "rgba(0,0,0,0.6)",
  color = "#fff",
  style,
  className,
}: Props) =>(
    <button
      onClick={onClick}
      title={title ?? kind}
      aria-label={ariaLabel ?? kind}
      className={className}
      style={{
        background: bg,
        color,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 10000,
        // sombras e hover suaves
        boxShadow: "0 2px 10px rgba(0,0,0,.35)",
        transition: "transform .12s ease, background-color .12s ease, opacity .12s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        {ICONS[kind]}
      </svg>
    </button>
);

export { VideoActionButton }

