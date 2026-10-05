import Film from "@layouts/film/Film";

export const metadata = {
  title: "BMDRM — The film",
  description:
    "BMDRM, the guardian of your video content: secure video hosting told as an origami kingdom.",
};

// ?capture renders the bare stage for the MP4 renderer; ?t=SECONDS opens on
// a given frame (handy for reviewing a shot)
const FilmPage = ({ searchParams }) => {
  const capture = searchParams?.capture !== undefined;
  const t = searchParams?.t !== undefined ? parseFloat(searchParams.t) : undefined;
  return (
    <main className="film-page">
      <Film capture={capture} start={Number.isFinite(t) ? t : undefined} />
    </main>
  );
};

export default FilmPage;
