import Image from "next/image"

export function ThreeCXBadge() {
  return (
    <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-lg">
      {/* 3CX Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold">
          <span className="text-blue-600">3</span>
          <span className="text-white bg-gray-800 px-1 rounded">C</span>
          <span className="text-white bg-gray-800 px-1 rounded relative">
            X
            <span className="absolute -top-1 -right-1 text-xs">®</span>
          </span>
        </div>
      </div>
      
      {/* Bronze Partner Section */}
      <div className="flex flex-col items-center">
        <div className="text-yellow-600 text-lg">★</div>
        <div className="text-gray-800 font-bold text-sm uppercase tracking-wide">
          Bronze
        </div>
        <div className="text-gray-800 font-bold text-sm uppercase tracking-wide">
          Partner
        </div>
      </div>
    </div>
  )
} 