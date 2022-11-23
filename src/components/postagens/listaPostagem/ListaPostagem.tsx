import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './ListaPostagem.css';

function ListaPostagem() {

    const [posts, setPosts] = useState<Postagem[]>([])
    let navigate = useNavigate();

    const token: any = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )
    const tipoUser: any = useSelector<TokenState, TokenState["tipoUser"]>(
        (state) => state.tipoUser
    )

    useEffect(() => {
        if (token == '') {
            toast.error('Você precisa estar logado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined
            });
            navigate("/login");
        }
    }, [token])

    async function getPost() {
        await busca("/postagens", setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getPost()
    }, [posts.length])

    return (
        <>
            <Box className='containerLista'>
                {posts.length === 0 && <span className="loader">L &nbsp; ading</span>}
                <div className='div-posts'>
                    {
                        posts.map(post => (
                            <Box m={2} className="caixa-posts">
                                <Card className='postagens'>
                                    <CardContent>
                                        {/* <Typography color="textSecondary" gutterBottom>
                    Postagens
                </Typography> */}
                                        <img src={post.imagem} alt="" className='imagem-post' />
                                        <Typography variant="body2" component="p" className='post-categoria'>
                                            {post.categoria?.tipo}
                                        </Typography>
                                        <Typography variant="h5" component="h2" className='titulo-post'>
                                            {post.titulo}
                                        </Typography>
                                        {/* <Typography variant="body2" component="p">
                    {post.subtitulo}
                </Typography> */}
                                        <Typography variant="body2" component="p" className='post-texto'>
                                            {post.texto}
                                        </Typography>
                                        <br />
                                        <Typography variant="body2" component="p" className='nome-autor'>
                                            {post.autor}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {new Date(Date.parse(post.data)).toLocaleDateString()} <br />
                                        </Typography>
                                    </CardContent>
                                    {tipoUser === "admin" ? (
                                        <CardActions>
                                            <Box display="flex" justifyContent="center" mb={1.5}>
                                                <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                                                    <Box mx={1}>
                                                        <Button variant="contained" size='small' className="botao-atualizar">
                                                            atualizar
                                                        </Button>
                                                    </Box>
                                                </Link>
                                                <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                                                    <Box mx={1}>
                                                        <Button variant="contained" size='small' className='botao-deletar'>
                                                            deletar
                                                        </Button>
                                                    </Box>
                                                </Link>
                                            </Box>
                                        </CardActions>
                                    ) : (
                                        null
                                    )}
                                </Card>
                            </Box>
                        ))
                    }</div>
            </Box>
        </>
    )
}

export default ListaPostagem;