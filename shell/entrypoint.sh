#!/bin/sh
cat <<EOF > /app/env.js
export default {
  MFE_HOST_HOME: "${MFE_HOST_HOME:-http://localhost:4001}",
  MFE_HOST_MARCOS: "${MFE_HOST_MARCOS:-http://localhost:4002}",
  MFE_HOST_SOBRE: "${MFE_HOST_SOBRE:-http://localhost:4000}",

  API_HOST_HOME: "${API_HOST_HOME:-http://localhost:3000}",
  API_HOST_MARCOS: "${API_HOST_MARCOS:-http://localhost:3000}",
  API_HOST_SOBRE: "${API_HOST_SOBRE:-http://localhost:3000}",
};
EOF

exec "$@"
