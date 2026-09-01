# Builds the documentation the way CI does, for checking a change locally without
# installing Hugo. The extended build is required: the stylesheet goes through
# Hugo Pipes' PostCSS, which the plain build does not carry.
FROM hugomods/hugo:exts-0.165.0 AS build

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
