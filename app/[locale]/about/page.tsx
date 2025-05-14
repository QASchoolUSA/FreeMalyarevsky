export default function AboutPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12">About Alexey Malyarevsky</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl mb-8">
            Alexey Malyarevsky&apos;s story is one of courage in the face of oppression,
            and unwavering commitment to democratic values in Russia.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Background</h2>
          <p className="mb-6">
            [Detailed background information about Alexey&apos;s life, education, and work
            before his arrest would go here]
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Arrest</h2>
          <p className="mb-6">
            On [date], Alexey was arrested for his peaceful political activism, which
            included participating in legal protests and making a modest donation of $150
            to Navalny&apos;s anti-corruption foundation.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Legal Process</h2>
          <p className="mb-6">
            The trial, which many international observers have criticized as politically
            motivated, concluded on October 23, 2023, with Alexey being sentenced to 7
            years in prison.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">International Response</h2>
          <p className="mb-6">
            [Information about international reactions, support from human rights
            organizations, and ongoing advocacy efforts would go here]
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">How You Can Help</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Sign petitions for Alexey&apos;s release</li>
            <li>Write letters to Russian authorities</li>
            <li>Share Alexey&apos;s story on social media</li>
            <li>Contact your government representatives</li>
            <li>Support organizations working for his release</li>
          </ul>
        </div>
      </div>
    </main>
  );
}