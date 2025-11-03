export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 p-4 text-center text-sm font-medium border-t border-gray-300 dark:border-zinc-700">
      <p>&copy; {new Date().getFullYear()} Amana Transportation. All Rights Reserved.</p>
    </footer>
  );
}