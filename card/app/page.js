import Card from "./components/Card";
import product from "./server/product";

export default function Home() {
  return (
    <>
      <div className="h-[100vh] flex items-center justify-center">
        <Card product={product} />
      </div>
    </>
  );
}
