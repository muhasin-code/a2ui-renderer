import Container from "../components/Container";
import Card from "../components/Card";
import Text from "../components/Text";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Form from "../components/Form";

/**
 * Registry mapping component type strings to React components.
 * The A2UIRenderer uses this to dynamically resolve what to render.
 */
const registry: Record<string, React.FC<any>> = {
  container: Container,
  card: Card,
  text: Text,
  button: Button,
  "text-field": TextField,
  form: Form,
};

export default registry;
