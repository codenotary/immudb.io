# Builds the documentation the way CI does, for checking a change locally without
# installing Hugo. This image carries Hugo, Node and git; git is required because
# `enableGitInfo` reads each page's last commit, and Node 22+ because Hugo's
# PostCSS step invokes node with `--permission` (Node 20 fails the build).
FROM hugomods/hugo:debian-node-git-0.165.0 AS build

WORKDIR /src

# npm supplies tailwindcss/postcss/autoprefixer for the PostCSS step and pagefind
# for the search index; the layer is cached on the lockfile alone.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN hugo --minify --gc && npx pagefind --site public

FROM nginx:alpine
COPY --from=build /src/public /usr/share/nginx/html
EXPOSE 80
