import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { login } from "../../services/Service";
import "./Login.css";
import UserLogin from "../../models/UserLogin";
import { toast } from "react-toastify";
import { addToken, addTipoUser } from "../../store/tokens/actions";
import { useDispatch } from 'react-redux';
import SetaVoltarIcone from '@mui/icons-material/ArrowBack';

function Login() {
  let navigate = useNavigate();


  const [token, setToken] = useState('')
  
  const dispatch = useDispatch()

  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    fotoUser: "",
    tipoUser: "",
    token: "",
  });

  const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    fotoUser: "",
    tipoUser: "",
    token: "",
  });

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    if (token !== "") {
      dispatch(addToken(token))
      navigate("/home");
    }
  }, [token]);

  useEffect(() => {
    if (respUserLogin.token !== "") {
      dispatch(addToken(respUserLogin.token))
      dispatch(addTipoUser(respUserLogin.tipoUser))
      navigate("/home");
    }
  }, [respUserLogin.token]);

  async function logar(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
        await login(`/usuarios/logar`, userLogin, setRespUserLogin)

        toast.success('Usuário logado com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined
        });
    } catch (error) {
        toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined
        });
    }
    console.log(respUserLogin)
}

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="fundoLogin">
      <Grid alignItems="center">
      <Link to='/'>
      <SetaVoltarIcone className="seta"/>
      </Link>
        <Box className="mod-login">
        <Box paddingX={20}>
          <form onSubmit={logar}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textos1"
            >
              Entrar
            </Typography>
            <TextField
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              value={userLogin.usuario}
              label="Usuário (e-mail)"
              name="usuario"
              fullWidth
            />
            <TextField
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
              value={userLogin.senha}
              label="Senha"
              name="senha"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
                <Button type="submit" variant="contained" color="primary" className="botao-entrar">
                  Entrar
                </Button>
            </Box>
          </form>
          
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center" className="textos1">
                Não tem uma conta?
              </Typography>
            </Box>
            <Box>
            <Link to="/cadastrar">
              <Typography
                variant="subtitle1"
                align="center"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
          </Box>
        </Box>
        </Box>
      </Grid>
      {/* <Grid xs={6} className="fundoLogin"></Grid> */}
    </Grid>
  );
}

export default Login;
