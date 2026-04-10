// Light-theme layout wrapper for all /locations/* pages to match standard Wingstop vibe
export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F9FAF7] min-h-screen">
      {children}
    </div>
  );
}
