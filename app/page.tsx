import { PageClient } from "./page-client";

export default function Home() {
  // JSON-LD structured data for Person schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Landry Bella",
    "url": "https://laclass.dev",
    "image": "https://laclass.dev/profile.jpg",
    "jobTitle": "Software Engineer & Tech Lead",
    "sameAs": [
      "https://github.com/bellandry",
      "https://linkedin.com/in/bellandry",
      "https://x.com/LaclassDev"
    ],
    "knowsAbout": ["Software Engineering", "React", "Node.js", "Full Stack Development", "Leadership"]
  };

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <PageClient />
    </div>
  );
}
