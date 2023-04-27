/**
 * Custom hook para realizar peticiones HTTP con fetch en React
 * @param {string} initialUrl - La URL inicial de la petición
 * @param {Object} initialOptions - Opciones iniciales para la petición (método, cabeceras, cuerpo, etc.)
 * @returns {Object} - Un objeto con los datos de la respuesta, errores, estado de carga y funciones de actualización de URL y opciones
 */
 export function useFetch(initialUrl, initialOptions = {}) {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(true);

  const [loading, setLoading] = useState(true);

  /**
   * Efecto secundario que se ejecuta cada vez que cambia la URL, las opciones o el estado de refresco.
   * Realiza la petición HTTP con fetch y actualiza el estado de los datos y errores.
   */
  useEffect(() => {
    setError(undefined);

    async function fetchData() {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
    fetchData();
  }, [url, options, refresh]);

  /**
   * Función que actualiza el estado de refresco, lo que desencadena una nueva petición HTTP.
   */
  const reRender = () => {
      setRefresh(!refresh)
  }


  return { data, error, loading, setUrl, setOptions, reRender };
}