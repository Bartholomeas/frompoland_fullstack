import { Exchange } from "@/features/exchange";


const Home = async () => {


  return (
    <main className="flex items-center justify-center flex-col gap-2 h-full container">
      <h1 className="text-2xl font-semibold text-foreground mb-4 text-center">Wymieniaj waluty w prosty sposób</h1>
      <Exchange />
    </main>
  );
};

export default Home;