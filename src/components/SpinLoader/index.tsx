import clsx from "clsx";

type SpinLoaderProps = {
  className?: string
}

export default function SpinLoader({ className = ''}: SpinLoaderProps) {
  return (
    <div className={clsx('flex', 'items-center', 'justify-center', className)}>
      <div className={clsx('w-10 h-10', 'border-5 border-t-transparent border-blue-500', 'rounded-full', 'animate-spin')}></div>
    </div>
  )
}