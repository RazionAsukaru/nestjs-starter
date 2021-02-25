import { Category } from '@entities/.';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from '@dto/.';
import { User } from '@entities/.';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async createCategory({ name }: CreateCategoryDto, user: User): Promise<Category> {
        const category = new Category();

        category.name = name;
        await category.save();
        return category;
    }

    // async getCategory({ status, search }: GetCategorysFilterDto, user: User): Promise<Category[]> {
    //     const query = this.createQueryBuilder('category');

    //     query.where('category.userId = :userId', { userId: user.id });

    //     if (status) {
    //         query.andWhere('category.status = :status', { status });
    //     }

    //     if (search) {
    //         query.andWhere('(category.title LIKE :search OR category.description LIKE :search)', {
    //             search: `%${search}%`,
    //         });
    //     }

    //     const categorys = await query.getMany();

    //     return categorys;
    // }
}
