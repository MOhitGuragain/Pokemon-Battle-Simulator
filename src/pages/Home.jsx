export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      
      {/* Pokemon Logo Image */}
      <img 
        src="/src/assets/Pokemon.png" 
        alt="Pokemon Battle Simulator Logo" 
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          display: 'block',
          margin: '20px auto'
        }}
      />
    </div>
  );
}