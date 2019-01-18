export {router as patients} from "./patients";
export {router as appointments} from "./appointments";

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
          <td>&lt;name&gt; &lt;surname&gt;</td>
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
        <tr>
          <td>GET</td>
          <td>/appointments</td>
          <td>&nbsp;</td>
          <td>Read all appointments</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/appointments</td>
          <td>&lt;date&gt; &lt;type&gt; &lt;patient-id&gt;</td>
          <td>Create appointment</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/appointments/&lt;id&gt;</td>
          <td>&nbsp;</td>
          <td>Read appointment</td>
        </tr>
        <tr>
          <td>PUT</td>
          <td>/appointments/&lt;id&gt;</td>
          <td>[date] [type] [patient-id]</td>
          <td>Update appointment</td>
        </tr>
        <tr>
          <td>DELETE</td>
          <td>/appointments/&lt;id&gt;</td>
          <td>&nbsp;</td>
          <td>Delete appointment</td>
        </tr>
      </tbody>
    </table>
  `);
}
