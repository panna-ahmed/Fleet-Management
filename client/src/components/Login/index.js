import Paper from '@material-ui/core/Paper';
import Login from './login'
import './login-heading.css';

const LoginContainer = () => {

  const paperStyle = { width: 360, margin: "40px auto" }

  return (
      <Paper elevation={20} variant="outlined" style={paperStyle}>
        <div className="Text__Item ">User Login </div>
        <Login />
      </Paper>

  )
}
export default LoginContainer;
