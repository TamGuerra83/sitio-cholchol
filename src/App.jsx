import React, { useState, useEffect } from 'react';
import './App.css';
import { Modal } from 'bootstrap';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function App() {
  const [formData, setFormData] = useState({ nombre: '', correo: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [mostrarServicios, setMostrarServicios] = useState(false);
  const [modalYaMostrado, setModalYaMostrado] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const servicios = ['Atención Ciudadana', 'Salud Municipal', 'Educación', 'Programas Educativos'];

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.correo) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }
    if (!formData.mensaje) newErrors.mensaje = 'El mensaje es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Formulario enviado:', formData);
      setSuccess(true);
      setFormData({ nombre: '', correo: '', mensaje: '' });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  useEffect(() => {
    if (!modalYaMostrado) {
      const modalElement = document.getElementById('modalInfo');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
        setModalYaMostrado(true);

        modalElement.addEventListener('hidden.bs.modal', () => {
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        });
      }
    }
  }, [modalYaMostrado]);

  return (
    <>
      {/* NAVBAR con MUI */}
      <AppBar position="sticky" sx={{ backgroundColor: '#0074c7' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.jpg" alt="Logo Municipalidad" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6">Municipalidad de Cholchol</Typography>
          </Box>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem button component="a" href="#inicio">
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button component="a" href="#servicios">
              <ListItemText primary="Servicios" />
            </ListItem>
            <ListItem button component="a" href="#contacto">
              <ListItemText primary="Contacto" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <div
        className="container py-4 position-relative"
        style={{
          backgroundImage: 'url("/foto1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          zIndex: 0
        }}
      >
        {/* Overlay blanco con transparencia */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(146, 203, 253, 0.5)',
            zIndex: 1
          }}
        ></div>

        {/* Contenido principal */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <header id="inicio" className="text-center p-4 bg-light rounded shadow-sm mb-4">
            <img src="/imagen3.png" className="img-fluid rounded mb-3" alt="Paisaje de Cholchol" />
            <h1 className="titulo-hover">Bienvenidos a Cholchol</h1>
            <p className="lead">Comprometidos con nuestra comunidad</p>
          </header>

          <section className="text-center mb-5">
          <h2 className="text-center mb-4 text-white text-shadow">Nuestros Servicios</h2>
            <Button variant="contained" onClick={() => setMostrarServicios(!mostrarServicios)}>
              {mostrarServicios ? 'Ocultar Servicios' : 'Mostrar Servicios'}
            </Button>

            {mostrarServicios && (
              <ul className="list-group mt-3">
                {servicios.map((servicio, i) => (
                  <li key={i} className="list-group-item">{servicio}</li>
                ))}
              </ul>
            )}
          </section>

          <section id="contacto">
            <Typography variant="h4" className="text-center mb-4 text-white text-shadow">Contacto</Typography>
            <Box
              component="form"
              sx={{ maxWidth: 500, mx: 'auto', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', p: 3, borderRadius: 2, boxShadow: 2 }}
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                error={Boolean(errors.nombre)}
                helperText={errors.nombre}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                error={Boolean(errors.correo)}
                helperText={errors.correo}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mensaje"
                name="mensaje"
                multiline
                rows={4}
                value={formData.mensaje}
                onChange={handleChange}
                error={Boolean(errors.mensaje)}
                helperText={errors.mensaje}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="success" fullWidth>
                Enviar
              </Button>
              {success && <Alert severity="success" sx={{ mt: 2 }}>¡Formulario enviado correctamente!</Alert>}
            </Box>
          </section>

          <footer className="text-white text-center mt-5 p-3" style={{ backgroundColor: '#0074c7' }}>
            &copy; 2025 Municipalidad de Cholchol - Todos los derechos reservados
          </footer>
        </div>
      </div>

      <div className="modal fade" id="modalInfo" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content text-center">
            <button type="button" className="btn-close ms-auto m-2" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            <img src="/permiso.png" alt="Permiso" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </>
  );
}
