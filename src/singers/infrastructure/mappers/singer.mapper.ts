import { Id } from '../../../shared';
import { Singer } from '../../domain';
import { SingerTable } from '../db';
import { SongMapper } from './song.mapper';

export class SingerMapper {
  static toTable(domain: Singer): SingerTable {
    const {
      fullName,
      picture,
      registerDate,
      isSubscribed,
      subscribedDate,
      songs,
      status,
      audit,
    } = domain.props;

    const table = new SingerTable();
    table.id = domain.id;
    table.fullName = fullName.unpack();
    table.picture = picture.unpack();
    table.registerDate = registerDate.unpack();
    table.isSubscribed = isSubscribed;
    table.subscribedDate = subscribedDate ? subscribedDate.unpack() : null;
    table.songs = songs ? songs.map((s) => SongMapper.toTable(s)) : [];
    table.status = status;

    const { createdBy, createdAt, updatedBy, updatedAt, timestamp } =
      audit.unpack();

    table.audit = {
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
      timestamp,
    };

    return table;
  }

  static toDomain(table: SingerTable): Singer {
    const {
      fullName,
      picture,
      registerDate,
      isSubscribed,
      subscribedDate,
      status,
      audit,
    } = table;

    const domain = Singer.mapFromRaw({
      id: table.id,
      fullName,
      picture,
      registerDate,
      isSubscribed,
      subscribedDate,
      status,
      audit: {
        createdBy: audit.createdBy,
        createdAt: audit.createdAt,
        updatedAt: audit.updatedAt,
        updatedBy: audit.updatedBy,
        timestamp: audit.timestamp,
      },
    });

    if (table.songs) {
      const songs = table.songs.map((s) => SongMapper.toDomain(s));

      songs.forEach((s) => {
        domain.addSong(s, s.props.audit);
      });
    }

    domain.id = Id.load(table.id);

    domain.markAsDirty();

    return domain;
  }
}
