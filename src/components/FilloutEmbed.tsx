import React, { useEffect, useRef } from 'react';

interface FilloutEmbedProps {
  formId: string;
  height?: number;
}

const FilloutEmbed: React.FC<FilloutEmbedProps> = ({ formId, height = 500 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any previous script
    const prevScript = document.getElementById('fillout-embed-script');
    if (prevScript) prevScript.remove();

    // Remove any previous embed
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Create the embed div
    if (containerRef.current) {
      const embedDiv = document.createElement('div');
      embedDiv.style.width = '100%';
      embedDiv.style.height = `${height}px`;
      embedDiv.setAttribute('data-fillout-id', formId);
      embedDiv.setAttribute('data-fillout-embed-type', 'standard');
      embedDiv.setAttribute('data-fillout-inherit-parameters', '');
      embedDiv.setAttribute('data-fillout-dynamic-resize', '');
      containerRef.current.appendChild(embedDiv);
    }

    // Add the Fillout script
    const script = document.createElement('script');
    script.id = 'fillout-embed-script';
    script.src = 'https://server.fillout.com/embed/v1/';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script and embed
      script.remove();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [formId, height]);

  return <div ref={containerRef} />;
};

export default FilloutEmbed; 