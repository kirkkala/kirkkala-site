import {
  ContentCardDescription,
  ContentCardDescriptionEmpty,
  ContentCardFork,
  ContentCardLang,
  ContentCardLink,
  ContentCardRow,
  ContentCardStars,
  ContentCardTitle,
} from "@/components/content-card";
import type { GitHubRepo } from "@/lib/github";

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <ContentCardLink href={repo.html_url}>
      <ContentCardRow>
        <ContentCardTitle>
          {repo.name}
          {repo.fork ? <ContentCardFork>fork</ContentCardFork> : null}
        </ContentCardTitle>
        {repo.stargazers_count > 0 ? (
          <ContentCardStars count={repo.stargazers_count} />
        ) : null}
      </ContentCardRow>
      {repo.description ? (
        <ContentCardDescription>{repo.description}</ContentCardDescription>
      ) : (
        <ContentCardDescriptionEmpty>
          No description
        </ContentCardDescriptionEmpty>
      )}
      {repo.language ? (
        <ContentCardLang>{repo.language}</ContentCardLang>
      ) : null}
    </ContentCardLink>
  );
}
