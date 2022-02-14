#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    GRANT ALL PRIVILEGES ON DATABASE testdb TO testuser;
    GRANT pg_read_all_data TO testuser;
    GRANT pg_write_all_data TO testuser;
EOSQL
