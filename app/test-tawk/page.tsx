import { TawkTest } from "@/components/ui/tawk-test";

export default function TestTawkPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          🧪 Test Intégration Tawk.to
        </h1>
        <TawkTest />
      </div>
    </div>
  );
}
