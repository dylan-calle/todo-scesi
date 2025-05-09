export const Copyright = () => {
    return (
      <footer style={{
        marginTop: '2rem',
        textAlign: 'center',
        color: '#888',
        fontSize: '0.875rem'
      }}>
        © {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.
      </footer>
    );
  };