import LoadingSpiner from "@/components/SpinLoader"
import clsx from "clsx"

function Dashboard() {
  return (
    <div>
      <h1 className={clsx('text-amber-500', 'text-6xl', 'bg-amber-700', 'justify-center')}>
        Dashboard
        {/* <LoadingSpiner /> */}
      </h1>
    </div>
  )
}

export default Dashboard