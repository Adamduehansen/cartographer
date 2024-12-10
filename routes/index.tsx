import { NewIndexButton } from "$islands/new-index-button.tsx";
import { IndexAllButton } from "$islands/index-all-button.tsx";
import { Pages } from "$islands/Pages.tsx";
import { PagesProvider } from "$islands/PagesContext.tsx";

export default function Home() {
  return (
    <PagesProvider pages={[]}>
      <NewIndexButton />
      <IndexAllButton />
      <Pages />
    </PagesProvider>
  );
}
