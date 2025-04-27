export default function ErrorBanner({ message }) {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
      {message}
    </div>
  );
}
