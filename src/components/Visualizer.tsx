import { useEffect, useRef } from 'react';

type Props = { active: boolean };

export function Visualizer({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    let animation = 0;

    const draw = () => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      const bars = 34;
      const barWidth = width / bars;
      for (let index = 0; index < bars; index += 1) {
        const wave = Math.sin(frame / 12 + index * 0.65);
        const amplitude = active ? 0.35 + Math.abs(wave) * 0.65 : 0.18;
        const barHeight = height * amplitude;
        const gradient = context.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, '#00d9ff');
        gradient.addColorStop(1, '#f7c948');
        context.fillStyle = gradient;
        context.shadowColor = '#00d9ff';
        context.shadowBlur = 16;
        context.fillRect(index * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
      }
      frame += 1;
      animation = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animation);
  }, [active]);

  return <canvas ref={canvasRef} width={420} height={96} className="h-20 w-full rounded-3xl opacity-90" />;
}
