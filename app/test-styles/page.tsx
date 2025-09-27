export default function TestStylesPage() {
  return (
    <main className="page-container content-section">
      <div className="page-header">
        <h1 className="page-title">Tailwind CSS Test</h1>
        <p className="page-subtitle">Testing all global styles and components</p>
      </div>
      
      <div className="space-y-8">
        {/* Typography Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Typography</h2>
          <div className="space-y-2">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
          </div>
        </section>

        {/* Colors Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Colors</h2>
          <div className="content-grid">
            <div className="p-4 bg-primary text-primary-foreground rounded-lg">Primary</div>
            <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">Secondary</div>
            <div className="p-4 bg-accent text-accent-foreground rounded-lg">Accent</div>
            <div className="p-4 bg-muted text-muted-foreground rounded-lg">Muted</div>
            <div className="p-4 bg-destructive text-destructive-foreground rounded-lg">Destructive</div>
            <div className="p-4 bg-card text-card-foreground border rounded-lg">Card</div>
          </div>
        </section>

        {/* Buttons Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-outline">Outline Button</button>
          </div>
        </section>

        {/* Cards Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Cards</h2>
          <div className="content-grid">
            <div className="p-6 border rounded-lg card-hover">
              <h3 className="font-semibold mb-2">Card with Hover</h3>
              <p className="text-muted-foreground">This card has hover effects</p>
            </div>
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="font-semibold mb-2">Regular Card</h3>
              <p className="text-muted-foreground">This is a regular card</p>
            </div>
            <div className="p-6 bg-primary text-primary-foreground rounded-lg">
              <h3 className="font-semibold mb-2">Primary Card</h3>
              <p className="opacity-90">This card uses primary colors</p>
            </div>
          </div>
        </section>

        {/* Form Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Form Elements</h2>
          <div className="max-w-md space-y-4">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input min-h-[100px]" placeholder="Enter your message"></textarea>
            </div>
            <button className="btn-primary w-full">Submit Form</button>
          </div>
        </section>

        {/* States Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">States</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="loading-spinner w-4 h-4"></div>
              <span>Loading...</span>
            </div>
            <p className="error-text">This is an error message</p>
            <p className="success-text">This is a success message</p>
          </div>
        </section>
      </div>
    </main>
  );
}
