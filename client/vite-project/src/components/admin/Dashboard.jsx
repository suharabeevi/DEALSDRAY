import HeaderWithnav from "./HeaderWithnav";

function Dashboard() {
  return (
    <div>
      <HeaderWithnav />

      <div className="flex items-center justify-center min-h-screen">
        <img
          src="https://res.cloudinary.com/dpgbodkae/image/upload/v1718785546/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I_u4kpy2.jpg"
          alt=""
        />
        <h1 className="text-4xl font-bold bg-yellow-400 p-9">
          Welcome to Admin panel
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;
