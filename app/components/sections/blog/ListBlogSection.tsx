import BlogCardsWrapper from "@/components/ui/blog/BlogCardsWrapper";
import ListBlogCards from "@/components/ui/blog/ListBlogCards";
import SectionLayout from "@/layouts/SectionLayout";
import { i18n } from "i18next";
import { H1 } from "@/components/ui/headings/RestPageHeadings";

export default function ListBlogSection({ i18n }: { i18n: i18n }) {
    return (
        <SectionLayout>
            <H1>{i18n.t('title')}</H1>
            <BlogCardsWrapper i18n={i18n}>
                <ListBlogCards />
            </BlogCardsWrapper>
        </SectionLayout >
    )
}