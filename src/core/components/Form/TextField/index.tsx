const TextField = () => {
    return <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700">
      Title
    </label>
    <input
      type="text"
      id="title"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter title"
    />
  </div>
}

export default TextField