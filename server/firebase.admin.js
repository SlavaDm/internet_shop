import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

const privateKey =
  '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKP+TMlVwBDS/E\nYaaEp3MhiP+/KANtz4gX9hrDDslyUX4ziZvYlCYNkyje0z4VpmLXO5XtBdWtaSNq\nQElk8LSX3NNG41Rz4hNNIzH6brgZQKXeCSAZaTLZZQfEIYPLKrgn6ghtLARCAAUi\n09ZOEsXgl8JiqL7ZrjLyBFup9QAS3mVifVp3rS+2pfAKJNyL+9j0fC2ef3yOI0ag\nc5irV57uypqI90XkSoPOSH3QC+ZaducmZsfCNzCC6lPgC3cQVhN4JAKNMZvJ64qh\nOBVfWdjSSx3pkLW9qib3VqPuePHMqcO29dnwbRJWWIpn9T3ZdqotCa0Fu70roBVx\nrkV8N3xVAgMBAAECggEABqCAIbsr7/wVOmast+04sFRp20MELovw4wzoV/qn24jg\nc4kPXZ7B5HEtX9ryGzyzDmeTndf/TJa38PPsTVQ2k3QXF1wjJazptWRXorB2dDVf\nE5IFYDyT/8JeT8awjjt3HBYaDC6EcTLI+EwsQHo/y5nzzGgurYYWTnUAGYCMOquW\no1BZfgNK7+WkheAF5fOPqwBLdLdB3rIufViaAzEOlRVxIXGwJzDtvXwH7xrDGUuy\nrJPpbpl9qLGrOmRbMmQ5ZqGNwq1TiQqRucv25uQDDckJakTVyKhFVglKIpJ4jkqb\niGs7H3wcBzf1NVAgVes16NsnG/qhAhc0hn+ZGaqEHQKBgQD/jR+DnwVc2/gxWfwV\nQZABJBpkhuSizuhiiJtwYrZdJE6FU6S/fK65OuiEDwx+recX3AO5E5Aj/sIhDPGE\ntnmnDyBfxYFTjGyKNnl3BIW60lz6IA3CBHaafpauplowYM0ze1gfhRYdrkQcsGKM\nhBNUN+Dnjd7q57QK4VXxei/39wKBgQDKms9m1l5SgnyUI3gtmmgfCXE0epYt2Je2\ncVz3dFlr+dVlbdPZP7vSA1gU2NQ5rKhS3rDU04voqJLVL83RaBGeHacOKg24eNoo\nElMlukH3r0h65WbPr5wr8XyU8xJ8L7XpTm6xfQDYjfMkDuq9AtnIicOQF6P1NF/8\noJdSKhVTEwKBgCWp6/ofJtAvz12esIuFdS7l3knwo6PnMNLM5XPj6JLDthrqX/6k\n5q+AIiLMgP/uq3+Vuqq9WmIjuwLaAIKZzkYz8YaL+mqQ6LJaIv7KmNcXCAMJVF3D\nAKP2gkjNVb+JlNTAmhVTLRZEx98ek/e3w42HCsu12iPu8FcmLN+BLa6zAoGARZnd\nOiTWjl3JUlLFDFWJA3CI9VBPmzxXEhPrrg7IUXGoP4n1RyK/8Su47KB4d7+6q41Z\nDiQGYkzW9GnRuOiZdMoXA6Sqxf6uYym4arOLyfzrV1zLbvmTGv2AoOLILOVvBtEs\n8chRrBNHvdFqDriV/HBnQG7+olP1zaGVmmJepQUCgYB616rGZ1Hd/YbyliRJ+M77\n1aD7iBDZ/GJ6wmNCxBYnL5alcDKMeBQSlM5Dp+YTjJvo8B4MsWLIDCpBLccV2qs0\nMKTebF4B9t3ZRanTFvgv56mCUjJ6+4Qyy6DOljRsDe1eKqrQvF2GazokUWslIKZR\nEbbanQ3L8TRNG8Cxlscs/w==\n-----END PRIVATE KEY-----\n';
const clientEmail =
  'firebase-adminsdk-hwwhc@nextjs-1cc28.iam.gserviceaccount.com';
const projectId = 'nextjs-1cc28';

initializeApp({
  credential: admin.credential.cert({
    privateKey,
    clientEmail,
    projectId,
  }),
  databaseURL: `https://${projectId}.firebaseio.com`,
});

export { admin };
