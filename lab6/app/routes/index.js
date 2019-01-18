export {router as patients} from "./patients";
export {router as visits} from "./visits";

// GET /
export function index(req, res) {
  res.status(200).send(`
    <table>
      <tbody>
        <tr>
          <th>Method</th>
          <th>URL</th>
          <th>Query params</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>GET</td>
          <td>/patients</td>
          <td>&nbsp;</td>
          <td>Read all patients</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/patients</td>
          <td>[name] [surname]</td>
          <td>Create patient</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/patients/&lt;id&gt;</td>
          <td>&nbsp;</td>
          <td>Read patient</td>
        </tr>
        <tr>
          <td>PUT</td>
          <td>/patients/&lt;id&gt;</td>
          <td>[name] [surname]</td>
          <td>Update patient</td>
        </tr>
        <tr>
          <td>DELETE</td>
          <td>/patients/&lt;id&gt;</td>
          <td>&nbsp;</td>
          <td>Delete patient</td>
        </tr>
      </tbody>
    </table>
  `);
}
