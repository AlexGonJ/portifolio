import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <>
      <style>{`
        .star-border-container {
          position: relative;
          display: inline-block;
          overflow: hidden;
          border-radius: 9999px;
          background-color: transparent;
        }
        .border-gradient-bottom,
        .border-gradient-top {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 0;
          transform-origin: 100% 100%;
          z-index: 0;
          animation: star-border-spin linear infinite;
        }
        .border-gradient-top {
          animation-direction: reverse;
          opacity: 0.8;
        }
        .inner-content {
          position: relative;
          z-index: 1;
          background-color: transparent;
          border-radius: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }
        @keyframes star-border-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <Component
        className={`star-border-container ${className}`}
        {...(rest as any)}
        style={{
          padding: `${thickness}px`,
          ...(rest as any).style
        }}
      >
        <div
          className="border-gradient-bottom"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
          }}
        ></div>
        <div
          className="border-gradient-top"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
          }}
        ></div>
        <div className="inner-content">{children}</div>
      </Component>
    </>
  );
};

export default StarBorder;
