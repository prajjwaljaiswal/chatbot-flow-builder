export default function Header() {
  return (
    <div className="w-full h-16 bg-gray-100">
      <h1>Header</h1>
      {/* <button
        className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setNodes([
            ...nodes,
            {
              id: `n${nodes.length + 1}`,
              position: { x: 0, y: 0 },
              data: { label: `Node ${nodes.length + 1}` },
            },
          ]);
        }}
      >
        Create New Message Node
      </button> */}
    </div>
  );
}
