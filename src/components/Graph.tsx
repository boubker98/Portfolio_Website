'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCallback, useRef, useEffect, useState } from 'react';

// Dynamically import specific ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-xl">Loading Graph...</div>
});

interface GraphData {
  nodes: { id: string; name: string; val: number }[];
  links: { source: string; target: string }[];
}

export default function Graph({ data }: { data: GraphData }) {
  const router = useRouter();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: 400
      });
    }
    
    // Resize observer to handle window resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: 400
        });
      }
    });
    
    if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();

  }, []);

  const handleNodeClick = useCallback((node: any) => {
    router.push(`/brain/${node.id}`);
  }, [router]);

  const isDark = theme === 'dark';
  
  return (
    <div ref={containerRef} className="w-full h-[400px] border rounded-xl overflow-hidden bg-card shadow-sm mb-8">
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeLabel="name"
        nodeColor={() => isDark ? '#60a5fa' : '#3b82f6'}
        linkColor={() => isDark ? '#4b5563' : '#e5e7eb'}
        backgroundColor={isDark ? '#00000000' : '#ffffff00'} // Transparent background to blend with theme
        onNodeClick={handleNodeClick}
        nodeRelSize={6}
        linkWidth={1.5}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        d3AlphaDecay={0.05}     // Slower stability
        d3VelocityDecay={0.3}   // Lower friction
        cooldownTicks={100}
      />
    </div>
  );
}
