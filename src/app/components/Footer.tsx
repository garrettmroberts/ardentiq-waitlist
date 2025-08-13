const Footer = () => {
    return (
    <footer className="py-12 px-4 border-t bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3>RAG Pipeline AI</h3>
            <p className="text-muted-foreground">
              Making enterprise AI accessible for every organization.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4>Product</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Features</p>
              <p>Pricing</p>
              <p>Security</p>
              <p>Integrations</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4>Company</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>About</p>
              <p>Blog</p>
              <p>Contact</p>
              <p>Privacy</p>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 RAG Pipeline AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;