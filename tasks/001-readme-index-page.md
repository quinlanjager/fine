# README Index Page

Generate the docs site index page from the project README content using the existing Deno Lume setup. The index page should display the README content styled with the daisyUI lofi theme. Copy the README markdown content into the docs index page and configure the layout and styles to use daisyUI's lofi theme.

The page content should be centered with a max-width container. A header/navbar sits at the top with the same padding as the main content. The header has a square logo placeholder on the left and small single-word navigation links on the right that anchor to the page sections (Install, Usage, Format, License).

## Tasks

- [x] Copy README.md content into docs/index.md as the index page content, keeping the layout frontmatter
- [x] Set the daisyUI theme to lofi in the layout template (data-theme attribute on html element)
- [x] Add daisyUI prose class to the content wrapper in the layout for proper markdown styling
- [x] Center the page content with a max-width container
- [x] Add a header with a square logo placeholder on the left and small single-word section links on the right
- [x] Ensure header has the same padding as the main content area
- [x] Verify the site builds and renders correctly with deno task build
