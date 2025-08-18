import { AspectRatio, Box, Skeleton } from "@chakra-ui/react";
import React, { forwardRef, useRef, useState, useImperativeHandle } from "react";

export type SmartVideoProps = {
  src: string;
  ratio?: number;                          
  controls?: boolean;                      
  hoverPlay?: boolean;                     
  loop?: boolean;                          
  muted?: boolean;                         
  preload?: "none" | "metadata" | "auto";  
  fit?: React.CSSProperties["objectFit"];  
  onClick?: () => void;
  className?: string;
};

const SmartVideo = forwardRef<HTMLVideoElement, SmartVideoProps>(
  (
    {
      src,
      ratio = 16 / 9,
      controls = false,
      hoverPlay = true,
      loop = true,
      muted = true,
      preload = "metadata",
      fit = "cover",
      onClick,
      className,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);

    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    const tryPlay = () => videoRef.current?.play().catch(() => {});
    const tryPause = () => videoRef.current?.pause();

    return (
      <Box
        position="relative"
        overflow="hidden"
        className={className}
        onMouseEnter={() => hoverPlay && !controls && tryPlay()}
        onMouseLeave={() => hoverPlay && !controls && tryPause()}
      >
        <AspectRatio ratio={ratio}>
          <>
            {!ready && !error && (
              <Skeleton position="absolute" inset={0} rounded="inherit" />
            )}

            <Box
              as="video"
              ref={videoRef}
              src={src}
              controls={controls}
              muted={muted}
              playsInline
              loop={loop}
              preload={preload}
              onLoadedMetadata={() => setReady(true)}
              onError={() => setError(true)}
              onClick={onClick}
              style={{
                width: "100%",
                height: "100%",
                objectFit: fit,
                display: error ? "none" : "block",
              }}
            />
          </>
        </AspectRatio>

        {error && (
          <Box
            position="absolute"
            inset={0}
            display="grid"
            placeItems="center"
            bg="blackAlpha.700"
            color="white"
            fontSize="sm"
          >
            Falha ao carregar o vídeo
          </Box>
        )}
      </Box>
    );
  }
);
SmartVideo.displayName = "SmartVideo";

export { SmartVideo }
