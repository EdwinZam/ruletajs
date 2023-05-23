# Next.js Ruleta App

Para correr localmente, se necesita la base de datos,
por lo cual ejecutaremos en la terminal

```
docker-compose up -d
```

- El -d, significa **detached**

- MongoDB URL Local:

```
mongodb://localhost:27017/ruletadb
```

# Reconstruir los módulos de node y levantar Next

```
yarn install
yarn dev
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **env**

## Llenar las base de datos con la informacíon de prueba

llamar:

```
http://localhost:3000/api/seed
```

endpoint:

```
http://localhost:3000/api/player
```
