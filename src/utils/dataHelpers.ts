import {IApp, IProgram} from '../store/types/programs';

export const optimizedData = (data: Array<IProgram>, language: string) => {
  const optimized = data.map((program: any) => {
    const premium = program?.[`premium_${language}`] || program.premium;
    const promotion = program?.[`promotion_${language}`] || program.promotion;
    const newApp: IApp = {
      body: program?.app?.[`body_${language}`] || program.app.body,
      short_description:
        program?.app?.[`short_description_${language}`] ||
        program.app.short_description,
    };
    const newCommission_groups: any = program.commission_groups.map(
      (nam: any) => ({
        name: nam?.[`name_${language}`] || nam.name,
        value: nam.value,
      }),
    );
    return {
      id: program.id,
      premium,
      image_id: program.image_id,
      image_url: program.image_url,
      promotion,
      spotlight: program.spotlight,
      program_type: program.program_type,
      advertiser: program.advertiser,
      app: newApp,
      commission_groups: newCommission_groups,
      category_ids: program.category_ids,
    } as IProgram;
  });

  return optimized;
};
