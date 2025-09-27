export default function ButtonTestPage() {
  return (
    <main className="page-container content-section">
      <div className="page-header">
        <h1 className="page-title">Button Styles Test</h1>
        <p className="page-subtitle">Testing all button variants and hover effects</p>
      </div>
      
      <div className="space-y-8">
        {/* Button Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-outline">Outline Button</button>
          </div>
        </section>

        {/* Button States */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Button States</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="btn-primary" disabled>Disabled Primary</button>
            <button className="btn-secondary" disabled>Disabled Secondary</button>
            <button className="btn-outline" disabled>Disabled Outline</button>
          </div>
        </section>

        {/* Button Sizes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
          <div className="flex gap-4 flex-wrap items-center">
            <button className="btn-primary text-sm px-3 py-1">Small</button>
            <button className="btn-primary">Normal</button>
            <button className="btn-primary text-lg px-6 py-3">Large</button>
          </div>
        </section>

        {/* Color Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Color Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary text-primary-foreground rounded-lg">
              <h3 className="font-semibold mb-2">Primary Colors</h3>
              <p className="text-sm opacity-90">Background and text colors</p>
            </div>
            <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
              <h3 className="font-semibold mb-2">Secondary Colors</h3>
              <p className="text-sm opacity-90">Background and text colors</p>
            </div>
            <div className="p-4 bg-accent text-accent-foreground rounded-lg">
              <h3 className="font-semibold mb-2">Accent Colors</h3>
              <p className="text-sm opacity-90">Background and text colors</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
