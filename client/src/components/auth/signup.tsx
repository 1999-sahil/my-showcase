interface SignupProps {
    setCurrentPage: (page: "login" | "signup") => void;
};

function Signup({ setCurrentPage }: SignupProps) {
  return (
    <div>Signup</div>
  )
}

export default Signup