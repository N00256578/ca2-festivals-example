import LoginForm from "@/components/LoginForm";

export default function Home({onLogin, loggedIn}) {
    return (
        <>
        <h1>This is Home</h1>
        {
            !loggedIn &&
            <LoginForm onLogin={onLogin}/>
        }
        </>
    );
};