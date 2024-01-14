export const onRequestPost: PagesFunction = async (context) => {
  const data = await context.request.formData();
  const file = data.get("file") as unknown as File;
  const fileName = file.name;
  return new Response(fileName);
};
